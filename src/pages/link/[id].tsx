import { useRouter } from 'next/router';

const LinkViewer = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>linkviewer is up for id #{id}</>;
};

export default LinkViewer;
