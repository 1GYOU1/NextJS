import Seo from "../../components/Seo";
import { useRouter } from "next/router";

export default function Detail({ params }) {
  const router = useRouter();
  console.log(router)//query: {title: 'Retribution', id: '762430'}
  const [title, id] = params || [];
  //const [title, id] = router.query.params
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}