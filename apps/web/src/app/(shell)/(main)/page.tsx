import { TokenHandler } from '@/features/auth';
import { HomePage } from '@/pages-layer/home/ui/HomePage';

const page = () => {
  return (
    <div>
      <TokenHandler />
      <HomePage />
    </div>
  );
};

export default page;
