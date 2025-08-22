'use client';

import Link from 'next/link';
import { useState } from 'react';
import css from './TagsMenu.module.css';

const TagsMenu = () => {

 const [ isOpen, setIsOpen ] = useState(false);  
 const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];  
 const toggle = () => setIsOpen(!isOpen);

    return(
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
            {tags.map((tag) =>
              <li className={css.menuItem} key={tag}>
                <Link href={`/notes/filter/${tag}`} 
                      className={css.menuLink} 
                      onClick={toggle}>{tag}
                </Link>
              </li>
            )}
    </ul>
      )}
       
</div>
    )
}

export default TagsMenu;
