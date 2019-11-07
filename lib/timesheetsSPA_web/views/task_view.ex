defmodule TimesheetsSPAWeb.TaskView do
  use TimesheetsSPAWeb, :view
  alias TimesheetsSPAWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      hours: task.hours,
      jobcode: task.jobcode,
      worker: task.worker,
      timesheetsid: task.timesheetsid
    }
  end
end
