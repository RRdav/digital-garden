import cloudinary from '@/app/lib/cloudinary/cloudinary';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { paramsToSign } = body;

        const secret = process.env.CLOUDINARY_API_SECRET;
        if (!secret) {
            return Response.json({ error: "Cloudinary API secret is not configured" }, { status: 500 });
        }

        const signature = cloudinary.utils.api_sign_request(paramsToSign, secret);
        return Response.json({
            signature,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            timestamp: paramsToSign.timestamp
        });

    } catch (error) {
        return Response.json({ error: "Failed to sign Cloudinary parameters" }, { status: 500 });
    }
}