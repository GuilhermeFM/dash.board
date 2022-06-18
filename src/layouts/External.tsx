import { Outlet } from "react-router-dom";

import logo from "../assets/DASH.BOARD.svg";

export function External() {
  return (
    <div className="flex h-screen w-screen overflow-auto bg-brand-800 p-5">
      <div className="m-auto flex max-w-lg rounded bg-zinc-50 p-5 sm:p-10">
        <Outlet />
      </div>
    </div>
  );
}
