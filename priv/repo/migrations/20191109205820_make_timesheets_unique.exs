defmodule TimesheetsSPA.Repo.Migrations.MakeTimesheetsUnique do
  use Ecto.Migration

  def change do
    create unique_index(:tss, [:workerid, :date])
  end
end
