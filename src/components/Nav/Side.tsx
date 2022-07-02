import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../../assets/Logo-2.svg";
import { useAuth } from "../../hooks/auth";

interface SideProps {
  onNavigate?: () => void;
}

export default function Side({ onNavigate }: SideProps) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen min-w-[300px] flex-col gap-3 overflow-auto bg-brand-900 shadow-[-30px_0px_60px_0px_#000000]">
      <img src={logo} alt="dashboard" className="mx-auto h-[60px] w-[150px] py-4" />
      <nav>
        {user?.nav.map(({ header, items }, index) => (
          <Fragment key={index}>
            {header && <p className="py-6 pl-6 text-sm font-bold text-white">{header}</p>}
            <div className="flex flex-col gap-2">
              {items.map(({ icon, title, to }, index) => (
                <Link
                  key={index}
                  to={to}
                  title={title}
                  onClick={onNavigate}
                  className="group flex cursor-pointer flex-row items-center"
                >
                  <>
                    <span
                      className={`${
                        pathname != to && "invisible"
                      } mr-5 h-10 rounded-r-lg border-2 border-white`}
                    />
                    {icon && (
                      <FontAwesomeIcon
                        icon={icon}
                        className={`${
                          pathname == to
                            ? "text-white"
                            : "text-slate-400 transition-colors group-hover:text-white"
                        } w-6 text-lg`}
                      />
                    )}
                    <span
                      className={`${
                        pathname == to
                          ? "text-white"
                          : "text-slate-400 transition-colors group-hover:text-white"
                      } ml-5 font-medium `}
                    >
                      {title}
                    </span>
                  </>
                </Link>
              ))}
            </div>
          </Fragment>
        ))}
      </nav>
      <p className="mx-auto mt-auto py-4 text-sm font-medium text-white">
        Dash.Board &copy;
      </p>
    </div>
  );
}
