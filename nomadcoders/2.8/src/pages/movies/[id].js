import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  console.log(router)//넘겨받은 API 정보 확인
  return (
    <div>
        <h4>{router.query.title || "Loading..."}</h4>
        {/* html 먼저 렌더링되고 js가 모두 로드되기 전에 Loading 노출 */}
    </div>
  );
}