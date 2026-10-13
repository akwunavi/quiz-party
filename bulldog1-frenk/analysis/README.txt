Analysis scripts used for BUTTERFLY V1 (paths tied to the working environment, like ../../analysis):
 - insect/gaze tracking and paw-band checks were run inline with numpy/cv2; results are in insect_track.json, gaze_track.json, start_end_diagnostics.json
 - alpha clean-up: DOG1_BUTTERFLY_v1_alpha.webm = pipeline alpha (dog_alpha.py --exclude-rect none --min-area 1500) + removal of alpha outside a 2-px halo of the opened (9x9 ellipse) main body, extra 21x21 core for frame index 36; encoded with the pipeline's own libvpx-vp9 command.
 - bf_prev.py renders the previews (track at game scale, follow x4 with the proposed butterfly dot, white/dark/magenta alpha check).
