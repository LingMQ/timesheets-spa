defmodule TimesheetsSPA.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budgethours, :integer
    field :code, :string
    field :desc, :string
    field :jobname, :string
    field :manager, :id

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:jobname, :desc, :code, :budgethours])
    |> validate_required([:jobname, :desc, :code, :budgethours])
  end
end
