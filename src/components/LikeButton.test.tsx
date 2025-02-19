import { fireEvent, render, screen } from '@testing-library/react';
import LikeButton from './LikeButton';

describe('LikeButton', () => {
  let mockOnLike: jest.Mock;
  beforeEach(() => {
    mockOnLike = jest.fn();
  });

  test('좋아요를 누르지 않은 경우, 좋아요 개수가 표시되며 하트 아이콘은 채워지지 않는다. ', () => {
    render(
      <LikeButton
        isLiked={false}
        heartCount={10}
        onLike={mockOnLike}
        disabled={false}
      />,
    );
    expect(screen.getByText('10')).toBeInTheDocument();
    const heartIcon = screen.getByRole('button').firstChild;
    expect(heartIcon).toHaveClass('fill-none');
  });

  test('좋아요 개수가 0이면 정상적으로 표시된다.', () => {
    render(
      <LikeButton
        isLiked={false}
        heartCount={0}
        onLike={mockOnLike}
        disabled={false}
      />,
    );
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('좋아요 버튼을 클릭할 때마다 onLike가 호출된다', () => {
    render(
      <LikeButton
        isLiked={false}
        heartCount={10}
        onLike={mockOnLike}
        disabled={false}
      />,
    );
    const button = screen.getByRole('button');
    expect(screen.getByText('10')).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnLike).toHaveBeenCalledTimes(1);

    fireEvent.click(button);
    expect(mockOnLike).toHaveBeenCalledTimes(2);
  });

  test('업체 회원인 경우, 좋아요 버튼이 비활성화된다다.', () => {
    render(
      <LikeButton
        isLiked={false}
        heartCount={10}
        onLike={mockOnLike}
        disabled={true}
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(mockOnLike).not.toBeCalled();
  });

  test('이미 좋아요를 누른 경우, 하트 아이콘이 채워진 상태로 표시된다.', () => {
    render(
      <LikeButton
        isLiked
        heartCount={10}
        onLike={mockOnLike}
        disabled={false}
      />,
    );
    const heartIcon = screen.getByRole('button').firstChild;
    expect(heartIcon).toHaveClass('fill-red-500');
  });
});
