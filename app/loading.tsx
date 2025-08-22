import css from './(private routes)/notes/filter/[...slug]/NotesClient.module.css';


const Loading = () => (
  <>
    <p className={css.text}>Loading, please wait...</p>   
  </>
);

export default Loading;