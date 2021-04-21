import { cloneElement, ReactElement, useEffect, useState } from 'react';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps): JSX.Element {
  const { asPath } = useRouter();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (shouldMatchExactHref) {
      setIsActive(asPath === rest.href || asPath === rest.as);
    } else {
      setIsActive(
        asPath.startsWith(rest.href.toString()) || asPath === rest.as,
      );
    }
  }, [asPath, rest.as, rest.href, shouldMatchExactHref]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
}
