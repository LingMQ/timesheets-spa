defmodule TimesheetsSPAWeb.JobView do
  use TimesheetsSPAWeb, :view
  alias TimesheetsSPAWeb.JobView

  def render("index.json", %{jobs: jobs}) do
    %{data: render_many(jobs, JobView, "job.json")}
  end

  def render("show.json", %{job: job}) do
    %{data: render_one(job, JobView, "job.json")}
  end

  def render("job.json", %{job: job}) do
    %{id: job.id,
      jobname: job.jobname,
      desc: job.desc,
      code: job.code,
      budgethours: job.budgethours,
      manager: job.manager
    }
  end
end
