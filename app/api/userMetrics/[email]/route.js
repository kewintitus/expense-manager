import userMetrics from '@/models/userMetrics';
import { connectToDb } from '@/utils/database';
// import { useRouter } from 'next/router';

// const router = useRouter();
// router.use(bodyParser.json());

export const GET = async (req, { params }) => {
  //   console.log('request', req);
  //   const { email } = await req.json();
  try {
    await connectToDb();
    console.log(params);
    if (params.email) {
      const metrics = await userMetrics.find({ 'user.email': params.email });
      // const metrics = await userMetrics.find({
      //   user: { email },
      // });
      return new Response(JSON.stringify(metrics), { status: 200 });
    }
  } catch (error) {
    return new Response('Unable to fetch user metrics', { status: 500 });
  }
};

// export { getUserMetrics as GET };
