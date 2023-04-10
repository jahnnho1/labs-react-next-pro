{navigation.map((item) => {
    return (
      (item.role === 'customer' && userData.role === 'customer') || item.role === 'none' ? (
        <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
          {item.name}
        </a>
      ) : token === undefined && item.role === 'login' ? (
        <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
          {item.name}
        </a>
      ) : (
        <></>
      )
    );
  })}



  {navigation.map((item) => 
    (item.role === 'customer' && userData.role === 'customer') || item.role === 'none' ? (
      <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
        {item.name}
      </a>
    ) : token === undefined && item.role === 'login' ? (
      <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
        {item.name}
      </a>
    ) : (
      <>
      </>
    )
  )}