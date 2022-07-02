import React, { Fragment, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, Popover, Transition } from "@headlessui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Side from "../components/Nav/Side";
import { useAuth } from "../hooks/auth";

export function Internal() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const locationParts = useMemo(() => {
    return pathname.split("/").filter(Boolean);
  }, [pathname]);

  return (
    <main className="flex h-screen w-full flex-row bg-slate-100">
      <aside className="hidden xl:block">
        <Side />
      </aside>

      <section className="h-full w-full overflow-auto">
        <header className="fixed flex w-full items-center bg-zinc-100 py-4 px-6 shadow xl:w-[calc(100%-300px)]">
          <Popover className="xl:hidden">
            <Popover.Button className="flex items-center">
              <FontAwesomeIcon icon={faBars} className="text-[24px] text-brand-900" />
            </Popover.Button>

            <Transition
              as={React.Fragment}
              enter="transition-all duration-100 ease-in-out"
              enterFrom="translate-x-[-300px]"
              enterTo="translate-x-0"
              leave="transition-all duration-75 ease-in-out"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-[-300px]"
            >
              <Popover.Panel className="absolute left-0 top-0 z-10">
                {({ close }) => <Side onNavigate={() => close()} />}
              </Popover.Panel>
            </Transition>
          </Popover>

          <div className="hidden w-full xl:flex xl:items-center">
            {locationParts.length <= 0 ? (
              <>
                <FontAwesomeIcon
                  icon={["fas", "chevron-right"]}
                  className="mr-2 text-brand-900"
                />
                <span className="text-base font-bold capitalize text-brand-900">
                  Home
                </span>
              </>
            ) : (
              <>
                {locationParts.map((path, index) => (
                  <Fragment key={index}>
                    <FontAwesomeIcon
                      icon={["fas", "chevron-right"]}
                      className="mr-2 text-brand-900"
                    />
                    <span
                      key={index}
                      className="text-base font-bold capitalize text-brand-900"
                    >
                      {path}
                    </span>
                  </Fragment>
                ))}
              </>
            )}
          </div>

          <div className="relative ml-auto flex items-center">
            <Menu>
              <Menu.Button>
                <img
                  src="https://avatars.githubusercontent.com/u/707177?v=4"
                  alt="Guilherme"
                  className="h-9 w-9 rounded-full"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute top-16 right-0 flex w-[300px] flex-col rounded-lg bg-white shadow">
                  <div className="flex flex-col justify-center rounded-t-lg bg-zinc-50 p-6">
                    <p className="text-md font-medium text-brand-900">{user?.name}</p>
                    <Link
                      to=""
                      className="mt-1 text-sm font-medium text-brand-200 transition-colors duration-150 hover:text-brand-400"
                    >
                      View my profile
                    </Link>
                  </div>
                  <div className="flex flex-col p-6">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${active && "bg-blue-500"}`}
                          href="/account-settings"
                        >
                          Account settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${active && "bg-blue-500"}`}
                          href="/account-settings"
                        >
                          Documentation
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item disabled>
                      <span className="opacity-75">Invite a friend (coming soon!)</span>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>

        <section className="mt-14 p-6">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
