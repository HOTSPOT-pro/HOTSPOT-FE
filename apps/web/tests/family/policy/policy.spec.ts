import { expect, test } from '@playwright/test';

test.describe('가족 커스텀 정책 테스트', () => {
  test('템플릿을 선택하면 그 데이터를 바탕으로 값을 불러오고 저장하면 가족 정책으로 추가된다', async ({
    page,
  }) => {
    await page.goto('/me/policy');
    await page.getByText('정책 관리').first().click();
    await page.getByText('정책 만들기').click();

    await page.getByRole('textbox', { name: '정책명' }).click();
    await page.getByRole('textbox', { name: '정책명' }).fill('커스텀 정책 생성');
    await page.getByRole('textbox', { name: '설명' }).click();
    await page.getByRole('textbox', { name: '설명' }).fill('커스텀 정책을 생성합니다.');
    await page.getByRole('button', { name: '반복 일정' }).click();
    await page.getByRole('button', { name: '월' }).click();
    await page.getByRole('button', { name: '화' }).click();
    await page.getByRole('button', { name: '수' }).click();
    await page.getByRole('textbox', { name: '시작 시간' }).click();
    await page.getByRole('button', { name: '입력값 지우기' }).nth(1).click();
    await page.getByRole('textbox', { name: '시작 시간' }).click();
    await page.getByRole('textbox', { name: '시작 시간' }).press('Tab');
    await page.getByRole('textbox', { name: '시작 시간' }).fill('09:30');
    await page.getByRole('textbox', { name: '시작 시간' }).press('Tab');
    await page.getByRole('textbox', { name: '시작 시간' }).press('Tab');
    await page.getByRole('textbox', { name: '종료 시간' }).click();
    await page.getByRole('textbox', { name: '종료 시간' }).press('Tab');
    await page.getByRole('textbox', { name: '종료 시간' }).fill('15:00');
    await page.getByRole('button', { name: '저장' }).click();
    await expect(page.locator('body')).toMatchAriaSnapshot(`
    - text: /커스텀 정책 생성 반복 커스텀 정책을 생성합니다\\. \\d+:\\d+~\\d+:\\d+ \\| 월 화 수/
    - button "정책 더보기":
      - img
    `);
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^커스텀 정책 생성반복커스텀 정책을 생성합니다\.09:30~15:00\|월화수$/ })
        .nth(2),
    ).toBeVisible();
  });

  test('가족 커스텀 정책 삭제 테스트', async ({ page }) => {
    await page.goto('/me/policy');
    await page.getByText('정책 관리').first().click();

    await page.getByRole('button', { name: '정책 더보기' }).click();
    await page.getByRole('button', { name: '삭제하기' }).click();
    await page.getByRole('button', { name: '삭제하기' }).click();

    await expect(page.getByText('적용된 데이터가 없습니다')).toBeVisible();
  });
});
