defmodule TimesheetsSPA.TssTest do
  use TimesheetsSPA.DataCase

  alias TimesheetsSPA.Tss

  describe "tss" do
    alias TimesheetsSPA.Tss.Ts

    @valid_attrs %{date: ~D[2010-04-17], status: "some status"}
    @update_attrs %{date: ~D[2011-05-18], status: "some updated status"}
    @invalid_attrs %{date: nil, status: nil}

    def ts_fixture(attrs \\ %{}) do
      {:ok, ts} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tss.create_ts()

      ts
    end

    test "list_tss/0 returns all tss" do
      ts = ts_fixture()
      assert Tss.list_tss() == [ts]
    end

    test "get_ts!/1 returns the ts with given id" do
      ts = ts_fixture()
      assert Tss.get_ts!(ts.id) == ts
    end

    test "create_ts/1 with valid data creates a ts" do
      assert {:ok, %Ts{} = ts} = Tss.create_ts(@valid_attrs)
      assert ts.date == ~D[2010-04-17]
      assert ts.status == "some status"
    end

    test "create_ts/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tss.create_ts(@invalid_attrs)
    end

    test "update_ts/2 with valid data updates the ts" do
      ts = ts_fixture()
      assert {:ok, %Ts{} = ts} = Tss.update_ts(ts, @update_attrs)
      assert ts.date == ~D[2011-05-18]
      assert ts.status == "some updated status"
    end

    test "update_ts/2 with invalid data returns error changeset" do
      ts = ts_fixture()
      assert {:error, %Ecto.Changeset{}} = Tss.update_ts(ts, @invalid_attrs)
      assert ts == Tss.get_ts!(ts.id)
    end

    test "delete_ts/1 deletes the ts" do
      ts = ts_fixture()
      assert {:ok, %Ts{}} = Tss.delete_ts(ts)
      assert_raise Ecto.NoResultsError, fn -> Tss.get_ts!(ts.id) end
    end

    test "change_ts/1 returns a ts changeset" do
      ts = ts_fixture()
      assert %Ecto.Changeset{} = Tss.change_ts(ts)
    end
  end
end
