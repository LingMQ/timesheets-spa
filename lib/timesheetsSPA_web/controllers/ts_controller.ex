defmodule TimesheetsSPAWeb.TsController do
  use TimesheetsSPAWeb, :controller

  alias TimesheetsSPA.Tss
  alias TimesheetsSPA.Tss.Ts

  action_fallback TimesheetsSPAWeb.FallbackController

  def index(conn, _params) do
    tss = Tss.list_tss()
    render(conn, "index.json", tss: tss)
  end

  def create(conn, %{"ts" => ts_params}) do
    with {:ok, %Ts{} = ts} <- Tss.create_ts(ts_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.ts_path(conn, :show, ts))
      |> render("show.json", ts: ts)
    end
  end

  def show(conn, %{"id" => id}) do
    ts = Tss.get_ts!(id)
    render(conn, "show.json", ts: ts)
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
