import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../../hooks/auth";
import { useFetch } from "../../hooks/fetch";
import { INav } from "../../api/interfaces/INav";

export function Profile() {
  const { user, removeUser, reloadNav } = useAuth();
  const { data, fetching, executeGet } = useFetch<INav[]>();

  const handleReloadNav = useCallback(async () => {
    await executeGet("reload-nav");
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    reloadNav(data);
  }, [data]);

  return (
    <Menu as="div" className="relative ml-auto flex items-center">
      <Menu.Button>
        <img
          src="https://avatars.githubusercontent.com/u/707177?v=4"
          alt="Guilherme"
          className="h-9 w-9 rounded-full"
        />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute top-16 right-0 flex w-[300px] flex-col rounded-lg bg-white shadow">
          <div className="flex flex-col justify-center rounded-t-lg bg-brand-700 p-6">
            <p className="text-md font-medium text-zinc-100">{user?.name}</p>
            <Link
              to=""
              className="mt-1 w-fit text-sm font-medium text-zinc-300 transition-colors duration-150 hover:text-zinc-100"
            >
              View my profile
            </Link>
          </div>
          <div className="flex flex-col">
            <Menu.Item>
              {({ active }) => (
                <button
                  disabled={fetching}
                  onClick={() => handleReloadNav()}
                  className={`${
                    active && "bg-zinc-100 text-white"
                  } flex items-center gap-4 px-6 py-4 text-sm text-brand-900 transition-colors duration-150 disabled:cursor-not-allowed`}
                >
                  <FontAwesomeIcon icon={["fas", "arrows-rotate"]} />
                  <span>Reload permissions</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => removeUser()}
                  className={`${
                    active && "bg-zinc-100 text-white"
                  } flex items-center gap-4 rounded-b-lg px-6 py-4 text-sm text-brand-900 transition-colors duration-150 disabled:cursor-not-allowed`}
                >
                  <FontAwesomeIcon icon={["fas", "arrow-right-from-bracket"]} />
                  <span>Exit</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
