defmodule TimesheetsSPAWeb.TsControllerTest do
  use TimesheetsSPAWeb.ConnCase

  alias TimesheetsSPA.Tss
  alias TimesheetsSPA.Tss.Ts

  @create_attrs %{
    date: ~D[2010-04-17],
    status: "some status"
  }
  @update_attrs %{
    date: ~D[2011-05-18],
    status: "some updated status"
  }
  @invalid_attrs %{date: nil, status: nil}

  def fixture(:ts) do
    {:ok, ts} = Tss.create_ts(@create_attrs)
    ts
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tss", %{conn: conn} do
      conn = get(conn, Routes.ts_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create ts" do
    test "renders ts when data is valid", %{conn: conn} do
      conn = post(conn, Routes.ts_path(conn, :create), ts: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.ts_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "2010-04-17",
               "status" => "some status"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.ts_path(conn, :create), ts: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update ts" do
    setup [:create_ts]

    test "renders ts when data is valid", %{conn: conn, ts: %Ts{id: id} = ts} do
      conn = put(conn, Routes.ts_path(conn, :update, ts), ts: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.ts_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "2011-05-18",
               "status" => "some updated status"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, ts: ts} do
      conn = put(conn, Routes.ts_path(conn, :update, ts), ts: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete ts" do
    setup [:create_ts]

    test "deletes chosen ts", %{conn: conn, ts: ts} do
      conn = delete(conn, Routes.ts_path(conn, :delete, ts))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.ts_path(conn, :show, ts))
      end
    end
  end

  defp create_ts(_) do
    ts = fixture(:ts)
    {:ok, ts: ts}
  end
end
