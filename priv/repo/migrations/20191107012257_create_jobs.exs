defmodule TimesheetsSPA.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :jobname, :string, null: false
      add :desc, :text
      add :code, :string, null: false
      add :budgethours, :integer, default: 0
      add :manager, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:jobs, [:manager])
  end
end
