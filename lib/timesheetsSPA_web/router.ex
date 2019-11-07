defmodule TimesheetsSPAWeb.Router do
  use TimesheetsSPAWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", LensWeb do
    pipe_through :ajax

    resources "/users", UserController, except: [:new, :edit]
    resources "/jobs", JobController, except: [:new, :edit]
    resources "/tss", TsController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
  end

  scope "/", TimesheetsSPAWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TimesheetsSPAWeb do
  #   pipe_through :api
  # end
end
