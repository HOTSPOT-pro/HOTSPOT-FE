import { Button, DonutChart } from '@hotspot/ui';

const page = () => {
  return (
    <div className="w-screen h-screen">
      <Button appName={''}>test</Button>
      <span className="text-blue-500">하이</span>
      <div className="w-20 h-20">
        <DonutChart
          data={[
            { name: '김치볶음밥', value: 5 },
            { name: '라면', value: 10 },
            { name: '잠', value: 20 },
            { name: '자고싶음', value: 5 },
          ]}
        />
      </div>
    </div>
  );
};

export default page;
