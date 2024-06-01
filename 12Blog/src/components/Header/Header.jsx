import React from "react";
import {Container , Logo ,LogoBtn} from '../index'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Header(){
    const authStatus = useSelector((state)=> state.status)
    const navigate = useNavigate();

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]

    return(
        <>
        <header className="py-3 shadow text-white text-xl bg-neutral-600">
            <Container>
                <nav className="flex">
                    <div className="">
                        <Link to="/">
                            <Logo/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((items)=>
                        items.active ? (
                            <li key={items.name}>
                                <button
                                onClick={()=> navigate(items.slug)}
                                className="inline-block px-6 py-2  duration-200 hover:bg-blue-100  hover:text-gray-700 rounded-full">
                                    {items.name}
                                </button>

                            </li>
                        ) : null 
                        )}
                        {
                            authStatus && (
                                <li>
                                    <LogoBtn/>
                                </li>
                            )
                        }
                    </ul>
                </nav>



            </Container>
        </header>
        </>
    )
}

export default Header