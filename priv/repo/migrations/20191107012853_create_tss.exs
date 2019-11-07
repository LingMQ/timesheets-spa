defmodule TimesheetsSPA.Repo.Migrations.CreateTss do
  use Ecto.Migration

  def change do
    create table(:tss) do
      add :status, :string, null: false
      add :date, :date, null: false
      add :workerid, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tss, [:workerid])
  end
end
