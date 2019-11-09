defmodule TimesheetsSPAWeb.TsController do
  use TimesheetsSPAWeb, :controller

  alias TimesheetsSPA.Tss
  alias TimesheetsSPA.Tss.Ts
  alias TimesheetsSPA.Tasks
  alias TimesheetsSPA.Jobs

  alias TimesheetsSPA.Users

  alias TimesheetsSPA.Tss.Ts

  action_fallback TimesheetsSPAWeb.FallbackController

  def index(conn, _params) do
    tss = Tss.list_tss()
    render(conn, "index.json", tss: tss)
  end

  def create(conn, %{"workerid" => workerid, "date" => date, "job_codes" => job_codes, "hours" => hours}) do
    curr = Tss.check_appeared(workerid, date)
    if curr do
      if hours === [] && job_codes === [] do

      else
        Tss.update_ts(curr, %{status: "Approved"})
      end

    else
      hours = Enum.map(hours, fn hour ->
        (
          if hour === "" do
            0
          else
            if is_binary(hour) do
              elem(Integer.parse(hour), 0)
            else
              hour
            end
          end
          )
      end)
      total_hr = Enum.sum(hours)
      if is_binary(workerid) do
        workerid = elem(Integer.parse(workerid), 0)
      end

      # only handle the total_hr <= 8
      if total_hr <= 8 do
        case Tss.create_ts(%{workerid: workerid, date: date, status: "New"}) do
          {:ok, sheet} ->
            entry = Enum.zip([job_codes, hours])

            Enum.map(entry, fn {c, h} ->
              {
                if h !== 0 do
                  Tasks.create_task(%{worker: workerid, timesheetsid: sheet.id, jobcode: Jobs.get_job_by_code(c), hours: h})
                end
              } end)
            conn
            |> put_status(:created)
            |> put_resp_header("location", Routes.ts_path(conn, :show, sheet))
            |> render("show.json", ts: sheet)
          {:error, %Ecto.Changeset{} = changeset} -> nil
        end
      end
    end
  end

  def show(conn, %{"id" => id}) do
    ts = Tss.get_ts_by_worker(id)
    user = Users.get_user!(id)
    if user.manager_id == -1 do
      ts = []
      # this is a manager

      # get all managed user and render
      all_user = Users.get_user_by_manager(id)
      all_user = Enum.map(all_user, fn u -> Tss.get_ts_by_worker(u.id) end)
      ts = Enum.reduce(all_user, [], fn (u, acc) -> Enum.concat(u, acc) end)
      render(conn, "show.json", ts: ts)
    else
      # this is a user
      render(conn, "show.json", ts: ts)
    end
  end

  def update(conn, %{"id" => id, "ts" => ts_params}) do
    ts = Tss.get_ts!(id)

    with {:ok, %Ts{} = ts} <- Tss.update_ts(ts, ts_params) do
      render(conn, "show.json", ts: ts)
    end
  end

  def delete(conn, %{"id" => id}) do
    ts = Tss.get_ts!(id)

    with {:ok, %Ts{}} <- Tss.delete_ts(ts) do
      send_resp(conn, :no_content, "")
    end
  end
end
