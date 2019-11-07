defmodule TimesheetsSPAWeb.TsView do
  use TimesheetsSPAWeb, :view
  alias TimesheetsSPAWeb.TsView

  def render("index.json", %{tss: tss}) do
    %{data: render_many(tss, TsView, "ts.json")}
  end

  def render("show.json", %{ts: ts}) do
    %{data: render_one(ts, TsView, "ts.json")}
  end

  def render("ts.json", %{ts: ts}) do
    %{id: ts.id,
      status: ts.status,
      date: ts.date,
      workerid: ts.workerid
    }
  end
end
