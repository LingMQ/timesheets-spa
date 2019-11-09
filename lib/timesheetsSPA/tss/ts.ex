defmodule TimesheetsSPA.Tss.Ts do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tss" do
    field :date, :date
    field :status, :string
    field :workerid, :id

    timestamps()
  end

  @doc false
  def changeset(ts, attrs) do
    ts
    |> cast(attrs, [:status, :date, :workerid])
    |> unique_constraint(:id, name: :tss_workerid_date_index, message: "duplicate timesheets")
    |> validate_required([:status, :date, :workerid])
  end
end
