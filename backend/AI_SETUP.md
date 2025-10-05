# AI Detection Setup Guide

## Overview
The SafetySnap application now uses AI/ML models to detect helmets and vests in uploaded images instead of random detection.

## Features
- **Real AI Detection**: Uses Hugging Face's free Inference API with pre-trained object detection models
- **Fallback System**: Automatically falls back to basic detection if AI API is unavailable
- **Multiple Models**: Supports different AI models for better accuracy
- **Free to Use**: No cost for basic usage with Hugging Face's free tier

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Get Hugging Face API Token (Optional but Recommended)
1. Go to [Hugging Face](https://huggingface.co/settings/tokens)
2. Create a free account if you don't have one
3. Generate a new token
4. Add it to your environment variables

### 3. Environment Variables
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/safetysnap
JWT_SECRET=your_jwt_secret_here
HUGGINGFACE_API_TOKEN=your_huggingface_token_here
PORT=5000
```

### 4. How It Works

#### AI Detection Process:
1. **Image Upload**: User uploads an image
2. **AI Analysis**: Image is sent to Hugging Face's object detection model
3. **Safety Equipment Filtering**: Results are filtered for helmets, vests, and safety equipment
4. **Bounding Box Generation**: AI provides precise coordinates for detected items
5. **Confidence Scoring**: Each detection includes a confidence score

#### Fallback System:
- If AI API is unavailable, the system automatically uses a fallback detection method
- Ensures the application continues to work even without internet connection
- Provides basic detection functionality

### 5. Supported AI Models

#### Primary Model: DETR (Detection Transformer)
- **Model**: `facebook/detr-resnet-50`
- **Type**: Object Detection
- **Accuracy**: High
- **Speed**: Medium

#### Alternative Model: YOLOS
- **Model**: `hustvl/yolos-tiny`
- **Type**: Object Detection
- **Accuracy**: Good
- **Speed**: Fast

### 6. Detection Labels
The AI system can detect and classify:
- **Helmets**: Hard hats, safety helmets, construction helmets
- **Vests**: Safety vests, high-visibility jackets, reflective clothing
- **General Safety Equipment**: Other safety-related items

### 7. API Response Format
```json
{
  "label": "helmet",
  "bbox": [x1, y1, x2, y2],
  "confidence": 0.85
}
```

### 8. Performance Notes
- **API Calls**: Each image upload makes one API call to Hugging Face
- **Timeout**: 30-second timeout for AI detection
- **Rate Limits**: Free tier has rate limits, but sufficient for most use cases
- **Caching**: Duplicate images are detected and cached

### 9. Troubleshooting

#### If AI Detection Fails:
- Check your internet connection
- Verify your Hugging Face API token
- Check the console logs for error messages
- The system will automatically use fallback detection

#### Common Issues:
- **Timeout Errors**: Increase timeout in `aiDetection.js`
- **API Rate Limits**: Wait a few minutes between requests
- **Invalid Token**: Verify your Hugging Face token is correct

### 10. Cost Information
- **Hugging Face Free Tier**: 1,000 requests per month
- **No Credit Card Required**: For basic usage
- **Upgrade Available**: For higher usage limits

## Testing
1. Start the backend server: `npm start`
2. Upload an image with safety equipment
3. Check the console logs for AI detection results
4. View the results in the frontend application

## Support
For issues with AI detection:
1. Check the console logs
2. Verify your API token
3. Test with different images
4. Check Hugging Face service status
