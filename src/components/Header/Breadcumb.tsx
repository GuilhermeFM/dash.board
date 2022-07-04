import { useMemo, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Breadcumb() {
  const { pathname } = useLocation();

  const locationParts = useMemo(() => {
    return pathname.split("/").filter(Boolean);
  }, [pathname]);

  return (
    <div className="flex items-center">
      {locationParts.length <= 0 ? (
        <>
          <FontAwesomeIcon icon={["fas", "chevron-right"]} className="text-brand-900" />
          <span className="mx-2 text-base font-bold capitalize text-brand-900">Home</span>
        </>
      ) : (
        <>
          {locationParts.map((path, index) => (
            <Fragment key={index}>
              <FontAwesomeIcon
                icon={["fas", "chevron-right"]}
                className="text-brand-900"
              />
              <span
                key={index}
                className="mx-2 text-base font-bold capitalize text-brand-900"
              >
                {path}
              </span>
            </Fragment>
          ))}
        </>
      )}
    </div>
  );
}
