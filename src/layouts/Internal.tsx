import { Outlet } from "react-router-dom";

import { Breadcumb } from "../components/Header/Breadcumb";
import { Profile } from "../components/Header/Profile";
import { Drawer } from "../components/Nav/Drawer";
import { Side } from "../components/Nav/Side";

export function Internal() {
  return (
    <main className="flex h-screen w-full flex-row bg-slate-100">
      <aside className="hidden xl:block">
        <Side />
      </aside>

      <section className="h-full w-full overflow-auto">
        <header className="fixed flex w-full items-center bg-zinc-100 py-4 px-6 shadow xl:w-[calc(100%-300px)]">
          <div className="xl:hidden">
            <Drawer />
          </div>

          <div className="hidden xl:block">
            <Breadcumb />
          </div>

          <Profile />
        </header>

        <section className="mt-14 p-6">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
