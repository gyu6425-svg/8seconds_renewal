import EmptyState from '../../components/common/EmptyState';

export default function NotFound() {
  return (
    <section className="w-full px-4 pb-24 md:px-0">
      <EmptyState
        title="페이지를 찾을 수 없습니다."
        description="주소가 변경되었거나 아직 준비되지 않은 메뉴입니다."
        actionLabel="홈으로 이동"
        actionTo="/"
      />
    </section>
  );
}
