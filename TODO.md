# UI/UX Cleanup & Debugging TODO

## Phase 1: Backend Fixes
- [x] 1. Fix `CONFIDENCE_THRESHOLD` in config.py: 0.01 → 0.25
- [x] 2. Update predictor.py: Add confidence filtering (if max_conf < 0.25 → "Uncertain" even if boxes exist)
- [x] 3. Update predictor.py: Return confidence=None for no detections instead of 0.0
- [x] 4. Update predictor.py: Enhanced raw YOLO debug printing

## Phase 2: Frontend Cleanup
- [x] 5. Remove HistoryPanel component (delete file)
- [x] 6. Update AnalyzePage.tsx: Remove history state, localStorage, imports
- [x] 7. Update PredictionCard.tsx: Remove Generate Report button + function
- [x] 8. Update PredictionCard.tsx: Hide Lifestyle Guidance when empty
- [x] 9. Update PredictionCard.tsx: Compact UI (reduce spacing)
- [x] 10. Update api.ts: Handle null/None confidence from backend
- [x] 11. Clean up unused imports across all files

## Phase 3: Verification
- [x] 12. All changes verified

