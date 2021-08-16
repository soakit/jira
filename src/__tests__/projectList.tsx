import React, { ReactNode } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import fakeData from "./fake.json";
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectList } from "../views/project-list/list";
import { AppProvider } from "../context";

const apiUrl = process.env.REACT_APP_API_URL;
const fakeAuth = {
  id: 1,
  name: "jack",
  token: "123",
};

const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => res(ctx.json(fakeAuth))),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(fakeData.users))),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(
      req.url.searchParams
    );
    debugger;
    const result = fakeData?.projects?.filter((project) => {
      return (
        project.name.includes(name) &&
        (personId ? project.personId === +personId : true)
      );
    });
    return res(ctx.json(result));
  })
);

// jest.setTimeout(600000) // debug时使用

// jest 是对react最友好的一个测试库
// beforeAll 代表执行所有的测试之前，先来执行一下回调函数
beforeAll(() => server.listen());

// 每一个测试跑完以后，都重置mock路由
afterEach(() => server.resetHandlers());

// 所有的测试跑完后，关闭mock路由
afterAll(() => server.close());

const waitTable = (text: string) =>
  waitFor(() => expect(screen.getByText(text)).toBeInTheDocument(), {
    timeout: 10000,
  });
test("项目列表展示正常", async () => {
  renderScreen(<ProjectList />, { route: "/projects" });
  await waitTable("骑手管理");
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("搜索项目", async () => {
  renderScreen(<ProjectList />, { route: "/projects?name=骑手" });

  await (() =>
    waitFor(
      () => expect(screen.getByText("骑手")).toHaveStyle("color: #FF0000"),
      {
        timeout: 10000,
      }
    ))();

  await new Promise((r) => setTimeout(r, 300));
  expect(screen.getAllByRole("row").length).toBe(2);
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(<AppProvider>{ui}</AppProvider>);
};