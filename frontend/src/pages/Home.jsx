import { useUsers } from "../hooks/useUsers";

function Home() {
  const { error, loading, Users } = useUsers()

  if (loading) return <h1>{ loading }</h1>

  if (error) return <h1>{ error }</h1>

  const content = Users?.length > 0 ?
    Users?.map(user =>
      <li key={ user?._id }>{ user?.fullname } : { user?.email }</li>
    ) : ""

  return <>
    <ul>{ content }</ul>;
  </>
}

export default Home;
