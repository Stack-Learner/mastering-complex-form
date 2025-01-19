import { cn } from '@/lib/utils';
import { Loader2, Upload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { Button } from '../../ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form';

type ImageUploadFieldProps<T extends FieldValues> = {
	name: Path<T>;
	label?: string;
	required?: boolean;
	className?: string;
	accept?: string;
	uploadFunction?: (file: File) => Promise<string>; // Returns URL after upload
};

export const ImageLinkField = <T extends FieldValues>({
	name,
	label,
	required = false,
	className,
	accept = 'image/*',
	uploadFunction = async (file: File) => {
		// Simulated upload - replace with actual upload function
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return URL.createObjectURL(file);
	},
}: ImageUploadFieldProps<T>) => {
	const [preview, setPreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const { control, setValue } = useFormContext<T>();

	const handleFile = useCallback(
		async (file: File) => {
			if (!file.type.startsWith('image/')) return;

			try {
				setIsUploading(true);
				// Create preview immediately
				const previewUrl = URL.createObjectURL(file);
				setPreview(previewUrl);

				// Upload file and get URL
				const uploadedUrl = await uploadFunction(file);
				setValue(name, uploadedUrl as PathValue<T, Path<T>>);
			} catch (error) {
				console.error('Upload failed:', error);
				setPreview(null);
				setValue(name, null as PathValue<T, Path<T>>);
			} finally {
				setIsUploading(false);
			}
		},
		[uploadFunction, name, setValue]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);

			const file = e.dataTransfer.files?.[0];
			if (file) handleFile(file);
		},
		[handleFile]
	);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};

	const handleRemove = () => {
		setPreview(null);
		setValue(name, null as PathValue<T, Path<T>>);
	};

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn(className)}>
					{label && (
						<FormLabel>
							{label}
							{required && <span className="text-red-500 ml-1">*</span>}
						</FormLabel>
					)}

					<FormControl>
						<div className="space-y-4">
							{!preview ? (
								<div
									className="flex items-center justify-center w-full"
									onDragOver={(e) => e.preventDefault()}
									onDragEnter={(e) => {
										e.preventDefault();
										setIsDragging(true);
									}}
									onDragLeave={(e) => {
										e.preventDefault();
										setIsDragging(false);
									}}
									onDrop={handleDrop}
								>
									<label
										className={cn(
											'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer',
											isDragging
												? 'border-primary bg-primary/5'
												: 'border-gray-300 bg-gray-50 hover:bg-gray-100'
										)}
									>
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
											{isUploading ? (
												<Loader2 className="w-10 h-10 mb-3 animate-spin" />
											) : (
												<Upload className="w-10 h-10 mb-3 text-gray-400" />
											)}
											<p className="mb-2 text-sm text-gray-500">
												<span className="font-semibold">
													{isUploading
														? 'Uploading...'
														: 'Click to upload or drag and drop'}
												</span>
											</p>
											<p className="text-xs text-gray-500">
												PNG, JPG, GIF up to 10MB
											</p>
										</div>
										<input
											{...field}
											type="file"
											className="hidden"
											accept={accept}
											onChange={handleImageChange}
											disabled={isUploading}
										/>
									</label>
								</div>
							) : (
								<div className="relative w-full h-64 rounded-lg overflow-hidden group">
									<img
										src={preview}
										alt="Preview"
										className="w-full h-full object-cover"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
										<Button
											type="button"
											variant="destructive"
											size="sm"
											onClick={handleRemove}
											disabled={isUploading}
											className="flex items-center gap-2"
										>
											<X size={16} />
											Remove
										</Button>
									</div>
								</div>
							)}
						</div>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
