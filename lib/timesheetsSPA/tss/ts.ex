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
    |> validate_required([:status, :date, :workerid])
  end
end
