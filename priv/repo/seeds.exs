# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TimesheetsSPA.Repo.insert!(%TimesheetsSPA.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TimesheetsSPA.Repo
alias TimesheetsSPA.Users.User
alias TimesheetsSPA.Jobs.Job


#pw1 = Argon2.hash_pwd_salt("password123")
#pw2 = Argon2.hash_pwd_salt("password456")

Repo.insert!(%User{id: 1, name: "e", email: "e@example.com", manager: true, manager_id: -1})
Repo.insert!(%User{id: 2, name: "manager1", email: "m1@timesheet.com", manager: true, manager_id: -1})
Repo.insert!(%User{id: 3, name: "manager2", email: "m2@timesheet.com", manager: true, manager_id: -1})

Repo.insert!(%User{id: 4, name: "alice", email: "alice@example.com", manager: false, manager_id: 1})
Repo.insert!(%User{id: 5, name: "bob", email: "bob@example.com", manager: false, manager_id: 1})
Repo.insert!(%User{id: 6, name: "worker1", email: "w1@timesheet.com", manager: false, manager_id: 4})
Repo.insert!(%User{id: 7, name: "worker2", email: "w2@timesheet.com", manager: false, manager_id: 4})
Repo.insert!(%User{id: 8, name: "worker3", email: "w3@timesheet.com", manager: false, manager_id: 4})

Repo.insert!(%Job{id: 1, jobname: "moon", desc: "moving to moon", code: "A12", budgethours: 20, manager: 1})
Repo.insert!(%Job{id: 3, jobname: "earth", desc: "saving earth environment", code: "A15", budgethours: 50, manager: 1})
Repo.insert!(%Job{id: 2, jobname: "mars", desc: "hello moon", code: "W79", budgethours: 100, manager: 2})