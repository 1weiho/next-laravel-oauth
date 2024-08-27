import Google from '@/components/icon/google';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-[500px] w-[400px] border rounded-xl flex flex-col justify-center items-center">
        <h1 className="text-2xl">登入</h1>

        <Button className="mt-4" variant="outline" asChild>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect`}
          >
            <Google className="mr-2" />
            Sign in with Google
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
