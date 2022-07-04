import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Side } from "./Side";

export function Drawer() {
  return (
    <Popover as={Fragment}>
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
  );
}
