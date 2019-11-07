defmodule TimesheetsSPA.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :hours, :integer, default: 0
      add :jobcode, :string, null: false
      add :worker, references(:users, on_delete: :nothing)
      add :timesheetsid, references(:tss, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:worker])
    create index(:tasks, [:timesheetsid])
  end
end
