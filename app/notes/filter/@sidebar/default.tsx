import Link from 'next/link';
import css from '../@sidebar/SidebarNotes.module.css';

const SidebarNotes = async () => {
    const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
    return (
        <ul className={css.menuList}>
           {tags.map((tag) => 
           <li key={tag} className={css.menuItem}>
             <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
           </li>
          )}
        </ul> 
    )
}

export default SidebarNotes;