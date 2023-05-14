import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faShuffle } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { error, loading, Users } = useUsers()

  if (loading) return <h1>{ loading }</h1>

  if (error) return <h1>{ error }</h1>

  const content = Users?.length > 0 ?
    Users?.map(user =>
      <li key={ user?._id }>{ user?.fullname } : { user?.email }</li>
    ) : ""

  return <>
    <nav className="navbar">
      <ul>
        <li>
          <FontAwesomeIcon icon={ faPlus } />
          <Link to={ "/new_user" } >CreateUser</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={ faShuffle } />
          <Link to={ "/generate_invoice" } >CreateInvoice</Link>
        </li>
      </ul>
    </nav>
    <h4 style={ { textAlign: "center", margin: ".5rem 0rem" } }>List Of Available Users</h4>
    <ul>{ content }</ul>;
  </>
}

export default Home;
