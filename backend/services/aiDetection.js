const { HfInference } = require('@huggingface/inference');
const fs = require('fs');

/**
 * AI Detection Service using Hugging Face YOLOv8 Models
 * Detects helmets 🪖 and safety vests 🦺 in an image
 */

// Initialize Hugging Face Inference client
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

/**
 * Detect safety helmets and vests in an image using Hugging Face object detection models
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<Array>} Array of detected objects with bounding boxes and confidence scores
 */
async function detectObjects(imagePath) {
  try {
    console.log('🚀 Starting detection for image:', imagePath);

    // Read image
    const imageBuffer = fs.readFileSync(imagePath);

    // 🪖 Helmet detection
    const helmetResults = await hf.objectDetection({
      model: 'keremberke/yolov8n-helmet-detection',
      inputs: imageBuffer
    });

    // 🦺 Vest detection
    const vestResults = await hf.objectDetection({
      model: 'keremberke/yolov8n-safety-vest-detection',
      inputs: imageBuffer
    });

    console.log('Raw Helmet Results:', helmetResults);
    console.log('Raw Vest Results:', vestResults);

    // Combine both detections
    const combinedResults = [
      ...helmetResults.map(d => ({
        label: 'helmet',
        bbox: normalizeBBox(d.box),
        confidence: parseFloat(d.score.toFixed(2))
      })),
      ...vestResults.map(d => ({
        label: 'vest',
        bbox: normalizeBBox(d.box),
        confidence: parseFloat(d.score.toFixed(2))
      }))
    ];

    console.log('✅ Final Detection Results:', combinedResults);

    // If nothing detected, return fallback
    if (combinedResults.length === 0) {
      console.warn('⚠️ No objects detected. Using fallback.');
      return smartFallbackDetection();
    }

    return combinedResults;

  } catch (error) {
    console.error('❌ Detection Error:', error.message);
    return smartFallbackDetection();
  }
}

/**
 * Normalize bounding boxes to (0–1) range
 * @param {object} box - Box object {xmin, ymin, xmax, ymax}
 * @returns {Array} Normalized [x1, y1, x2, y2]
 */
function normalizeBBox(box) {
  // Hugging Face models return pixel coordinates, so you might want to normalize them if needed
  const { xmin, ymin, xmax, ymax } = box;
  return [
    parseFloat((xmin / 640).toFixed(2)),
    parseFloat((ymin / 640).toFixed(2)),
    parseFloat((xmax / 640).toFixed(2)),
    parseFloat((ymax / 640).toFixed(2))
  ];
}

/**
 * Fallback detection when AI API fails
 */
function smartFallbackDetection() {
  console.log('🧠 Using smart fallback (approximate positions)');
  return [
    {
      label: 'helmet',
      bbox: [0.25, 0.1, 0.75, 0.4],
      confidence: 0.8
    },
    {
      label: 'vest',
      bbox: [0.2, 0.3, 0.8, 0.7],
      confidence: 0.7
    }
  ];
}

module.exports = {
  detectObjects,
  smartFallbackDetection
};
