defmodule TimesheetsSPA.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :manager, :boolean, default: false, null: false
      add :manager_id, :integer, default: -1

      timestamps()
    end

  end
end
