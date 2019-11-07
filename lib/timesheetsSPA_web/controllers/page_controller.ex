defmodule TimesheetsSPAWeb.PageController do
  use TimesheetsSPAWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
