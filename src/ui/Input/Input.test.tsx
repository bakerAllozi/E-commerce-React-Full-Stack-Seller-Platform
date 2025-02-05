import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const TestWrapper = ({
  name,
  type,
  label,
  placeholder,
}: {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
}) => {
  const { register } = useForm();

  return (
    <Input
      register={register}
      name={name as any}
      type={type as any}
      label={label}
      placeholder={placeholder}
    />
  );
};

describe('Input component', () => {
  test('يجب أن يعرض النص عند ظهور التنبيه', () => {
    render(
      <TestWrapper
        name="comment"
        type="text"
        label="Comment"
        placeholder="Write your comment here"
      />
    );

    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Write your comment here/i)
    ).toBeInTheDocument();
  });
  test('يجب أن يسمح بإدخال الأرقام عند type="number"', async () => {
    render(<TestWrapper name="price" type="number" />);

    const input = screen.getByRole('spinbutton'); // عنصر إدخال رقمي
    await userEvent.type(input, '123');

    expect(input).toHaveValue(123);
  });
  test('يجب أن يسمح برفع ملف عند type="file"', async () => {
    render(<TestWrapper label="Image" name="image" type="file" />);

    const input = screen.getByLabelText(/image/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
    const file = new File(['dummy content'], 'test-image.png', {
      type: 'image/png',
    });
    await userEvent.upload(input, file);

    expect(input.files).toHaveLength(1);
    expect(input.files[0].name).toBe('test-image.png');
  });
});
