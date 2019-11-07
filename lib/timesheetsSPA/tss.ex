defmodule TimesheetsSPA.Tss do
  @moduledoc """
  The Tss context.
  """

  import Ecto.Query, warn: false
  alias TimesheetsSPA.Repo

  alias TimesheetsSPA.Tss.Ts

  @doc """
  Returns the list of tss.

  ## Examples

      iex> list_tss()
      [%Ts{}, ...]

  """
  def list_tss do
    Repo.all(Ts)
  end

  @doc """
  Gets a single ts.

  Raises `Ecto.NoResultsError` if the Ts does not exist.

  ## Examples

      iex> get_ts!(123)
      %Ts{}

      iex> get_ts!(456)
      ** (Ecto.NoResultsError)

  """
  def get_ts!(id), do: Repo.get!(Ts, id)

  @doc """
  Creates a ts.

  ## Examples

      iex> create_ts(%{field: value})
      {:ok, %Ts{}}

      iex> create_ts(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_ts(attrs \\ %{}) do
    %Ts{}
    |> Ts.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a ts.

  ## Examples

      iex> update_ts(ts, %{field: new_value})
      {:ok, %Ts{}}

      iex> update_ts(ts, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_ts(%Ts{} = ts, attrs) do
    ts
    |> Ts.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Ts.

  ## Examples

      iex> delete_ts(ts)
      {:ok, %Ts{}}

      iex> delete_ts(ts)
      {:error, %Ecto.Changeset{}}

  """
  def delete_ts(%Ts{} = ts) do
    Repo.delete(ts)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking ts changes.

  ## Examples

      iex> change_ts(ts)
      %Ecto.Changeset{source: %Ts{}}

  """
  def change_ts(%Ts{} = ts) do
    Ts.changeset(ts, %{})
  end
end