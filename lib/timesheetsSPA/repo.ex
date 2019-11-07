defmodule TimesheetsSPA.Repo do
  use Ecto.Repo,
    otp_app: :timesheetsSPA,
    adapter: Ecto.Adapters.Postgres
end
