import { expect, test } from '@playwright/test';

test.describe('가족 구성원 우선순위 변경 테스트', () => {
  test('드래그 앤 드롭으로 순서를 바꾸고 저장하면 올바른 데이터가 서버로 전송되어야 한다', async ({
    page,
  }) => {
    // 1. 초기 데이터 세팅 (Mocking)
    const mockFamilyData = {
      code: '200',
      data: {
        familyDataAmount: 15.0,
        familyId: 250001,
        familyNum: 3,
        memberPolicies: [
          {
            appBlockedServiceResponseList: [],
            blockPolicyResponseList: [],
            familyDataSubLimit: 15.0,
            familyDataUsage: 0.0,
            isBlocked: false,
            memberId: 1000001,
            memberName: '대표자',
            priority: 1, // 첫 번째 순서
            role: 'OWNER',
            subId: 1000005,
          },
          {
            appBlockedServiceResponseList: [],
            blockPolicyResponseList: [],
            familyDataSubLimit: 15.0,
            familyDataUsage: 0.0,
            isBlocked: false,
            memberId: 1000004,
            memberName: '부모님',
            priority: 2, // 두 번째 순서
            role: 'PARENT',
            subId: 1000003,
          },
          {
            appBlockedServiceResponseList: [],
            blockPolicyResponseList: [],
            familyDataSubLimit: 15.0,
            familyDataUsage: 0.0,
            isBlocked: false,
            memberId: 1000006,
            memberName: '자식',
            priority: 3, // 세 번째 순서
            role: 'CHILD',
            subId: 1000002,
          },
        ],
        priorityType: 'PRIORITY',
      },
      message: '요청에 성공하였습니다.',
      status: 200,
    };

    await page.route('**/api/v1/policies/applied?isFamily=true', async (route) => {
      await route.fulfill({ json: mockFamilyData });
    });

    // 2. 페이지 접속 및 진입
    await page.goto('/me/policy');
    await page.getByText('정책 관리').first().click(); // 중복 방지 위해 first() 사용
    await page.getByText('편집').click();

    // 💡 에러 해결: 정확한 '우선순위' 버튼 지정
    await page.getByRole('button', { name: '우선순위' }).click();

    // 3. 드래그 앤 드롭 실행
    // 텍스트가 다른 곳에도 있을 수 있으므로 리스트 내의 요소를 타겟팅하는 것이 안전합니다.
    const dragItem = page.getByText('대표자').first();
    const dropTarget = page.getByText('부모님').first();

    // 요소의 위치 정보를 가져옵니다.
    const sourceBox = await dragItem.boundingBox();
    const targetBox = await dropTarget.boundingBox();

    if (sourceBox && targetBox) {
      // 1. 드래그 시작점으로 마우스 이동 및 클릭 유지
      await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
      await page.mouse.down();

      // 2. 중간 경로를 거쳐 드롭 대상으로 천천히 이동 (steps가 핵심!)
      // steps: 10은 이동 경로를 10단계로 나누어 이동하라는 뜻입니다.
      await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, {
        steps: 20,
      });

      // 3. 마우스 떼기
      await page.mouse.up();
    }

    // 드래그 후 UI가 반영될 아주 짧은 시간을 줍니다.
    await page.waitForTimeout(500);

    // 4. 저장 및 API 검증
    // waitForRequest 대신 waitForResponse를 쓰면 서버가 받은 데이터까지 확신할 수 있습니다.
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.request().method() === 'PATCH' && res.url().includes('/api/v1/families/priority'),
        { timeout: 5000 }, // 5초 대기
      ),
      page.getByRole('button', { name: '저장' }).click(),
    ]);

    const sentData = await response.request().postDataJSON();

    // 1. 객체 내의 'memberPriorities' 배열을 추출합니다.
    const priorities = sentData.memberPriorities;

    // 2. 해당 배열이 기대한 데이터를 포함하고 있는지 검증합니다.
    expect(priorities).toContainEqual(
      expect.objectContaining({
        priority: 1,
        subId: 1000003,
      }),
    );

    expect(priorities).toContainEqual(
      expect.objectContaining({
        priority: 2,
        subId: 1000005,
      }),
    );

    expect(priorities).toContainEqual(
      expect.objectContaining({
        priority: 3,
        subId: 1000002,
      }),
    );

    // 추가로 familyId도 잘 들어갔는지 확인하면 더 완벽합니다.
    expect(sentData.familyId).toBe(250001);
  });
});
