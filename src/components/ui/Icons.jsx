export let Search = ({ size = 20, color = "black", inher, className }) => {
  return (
    <svg viewBox="0 0 50 50" width={size} height={size} className={className}>
      <path
        d="M21 3C11.601563 3 4 10.601563 4 20C4 29.398438 11.601563 37 21 37C24.355469 37 27.460938 36.015625 30.09375 34.34375L42.375 46.625L46.625 42.375L34.5 30.28125C36.679688 27.421875 38 23.878906 38 20C38 10.601563 30.398438 3 21 3 Z M 21 7C28.199219 7 34 12.800781 34 20C34 27.199219 28.199219 33 21 33C13.800781 33 8 27.199219 8 20C8 12.800781 13.800781 7 21 7Z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Logout = ({ size = 20, color = "black", inher, className }) => {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M12 6C8.7099679 6 6 8.7099679 6 12L6 36C6 39.290032 8.7099679 42 12 42L29 42C31.776017 42 34.247059 40.180505 34.9375 37.498047 A 2.0004892 2.0004892 0 1 0 31.0625 36.501953C30.864941 37.269495 29.951983 38 29 38L12 38C10.872032 38 10 37.127968 10 36L10 12C10 10.872032 10.872032 10 12 10L29 10C29.951983 10 30.864941 10.730505 31.0625 11.498047 A 2.0004892 2.0004892 0 1 0 34.9375 10.501953C34.247059 7.8194949 31.776017 6 29 6L12 6 z M 33.978516 15.980469 A 2.0002 2.0002 0 0 0 32.585938 19.414062L35.171875 22L17 22 A 2.0002 2.0002 0 1 0 17 26L35.171875 26L32.585938 28.585938 A 2.0002 2.0002 0 1 0 35.414062 31.414062L41.414062 25.414062 A 2.0002 2.0002 0 0 0 41.414062 22.585938L35.414062 16.585938 A 2.0002 2.0002 0 0 0 33.978516 15.980469 z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Close = ({ size = 20, color = "black", inher, className }) => {
  return (
    <svg viewBox="0 0 30 30" width={size} height={size} className={className}>
      <path
        d="M7.9785156 5.9804688 A 2.0002 2.0002 0 0 0 6.5859375 9.4140625L12.171875 15L6.5859375 20.585938 A 2.0002 2.0002 0 1 0 9.4140625 23.414062L15 17.828125L20.585938 23.414062 A 2.0002 2.0002 0 1 0 23.414062 20.585938L17.828125 15L23.414062 9.4140625 A 2.0002 2.0002 0 0 0 21.960938 5.9804688 A 2.0002 2.0002 0 0 0 20.585938 6.5859375L15 12.171875L9.4140625 6.5859375 A 2.0002 2.0002 0 0 0 7.9785156 5.9804688 z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Edit = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} {...props}>
      <path
        d="M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Done = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 26 26" width={size} height={size} {...props}>
      <path
        d="M22.566406 4.730469L20.773438 3.511719C20.277344 3.175781 19.597656 3.304688 19.265625 3.796875L10.476563 16.757813L6.4375 12.71875C6.015625 12.296875 5.328125 12.296875 4.90625 12.71875L3.371094 14.253906C2.949219 14.675781 2.949219 15.363281 3.371094 15.789063L9.582031 22C9.929688 22.347656 10.476563 22.613281 10.96875 22.613281C11.460938 22.613281 11.957031 22.304688 12.277344 21.839844L22.855469 6.234375C23.191406 5.742188 23.0625 5.066406 22.566406 4.730469Z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Loading = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} {...props}>
      <path
        d="M16.03125 4.25C15.066406 4.25 14.28125 5.035156 14.28125 6C14.28125 6.964844 15.066406 7.75 16.03125 7.75C16.996094 7.75 17.78125 6.964844 17.78125 6C17.78125 5.035156 16.996094 4.25 16.03125 4.25 Z M 23.09375 6.96875C21.988281 6.96875 21.09375 7.863281 21.09375 8.96875C21.09375 10.074219 21.988281 10.96875 23.09375 10.96875C24.199219 10.96875 25.09375 10.074219 25.09375 8.96875C25.09375 7.863281 24.199219 6.96875 23.09375 6.96875 Z M 8.96875 7.40625C8.140625 7.40625 7.46875 8.078125 7.46875 8.90625C7.46875 9.734375 8.140625 10.40625 8.96875 10.40625C9.796875 10.40625 10.46875 9.734375 10.46875 8.90625C10.46875 8.078125 9.796875 7.40625 8.96875 7.40625 Z M 26 13.78125C24.757813 13.78125 23.75 14.789063 23.75 16.03125C23.75 17.273438 24.757813 18.28125 26 18.28125C27.242188 18.28125 28.25 17.273438 28.25 16.03125C28.25 14.789063 27.242188 13.78125 26 13.78125 Z M 6 14.71875C5.308594 14.71875 4.75 15.277344 4.75 15.96875C4.75 16.660156 5.308594 17.21875 6 17.21875C6.691406 17.21875 7.25 16.660156 7.25 15.96875C7.25 15.277344 6.691406 14.71875 6 14.71875 Z M 23.03125 20.59375C21.652344 20.59375 20.53125 21.714844 20.53125 23.09375C20.53125 24.472656 21.652344 25.59375 23.03125 25.59375C24.410156 25.59375 25.53125 24.472656 25.53125 23.09375C25.53125 21.714844 24.410156 20.59375 23.03125 20.59375 Z M 8.90625 22.03125C8.355469 22.03125 7.90625 22.480469 7.90625 23.03125C7.90625 23.582031 8.355469 24.03125 8.90625 24.03125C9.457031 24.03125 9.90625 23.582031 9.90625 23.03125C9.90625 22.480469 9.457031 22.03125 8.90625 22.03125 Z M 15.96875 23C14.3125 23 12.96875 24.34375 12.96875 26C12.96875 27.65625 14.3125 29 15.96875 29C17.625 29 18.96875 27.65625 18.96875 26C18.96875 24.34375 17.625 23 15.96875 23Z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Add = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        d="M20,11h-7V4c0-0.552-0.448-1-1-1s-1,0.448-1,1v7H4c-0.552,0-1,0.448-1,1s0.448,1,1,1h7v7c0,0.552,0.448,1,1,1s1-0.448,1-1 v-7h7c0.552,0,1-0.448,1-1S20.552,11,20,11z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Like = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} {...props}>
      <path
        d="M27.96875 8.1972656C27.830549 8.1955684 27.753906 8.1992188 27.753906 8.1992188C25.918906 19.025219 21.179891 21.184297 14.712891 31.154297L18.115234 48.859375C18.115234 48.859375 22.414048 51.673082 26.753906 52.064453L26.744141 52.070312C26.744141 52.070312 35 53 40 53C40.010827 53 40.022361 52.998076 40.033203 52.998047C40.03848 52.998263 40.05532 52.99979 40.060547 53C40.078777 53.000734 40.096998 52.992277 40.115234 52.992188C42.227796 52.972492 44.610841 52.415569 46 52C47.104 51.67 49 51.508 49 48.5C49 45.492 46 45 46 45C48 45 50 44 50 41.5C50 39 48.364 38 47 38C49 38 51 37 51 34.5C51 32 49.364 31 48 31L46 31C48 31 50 30 50 27.5C50 25 48 24 46 24L45 24L41 24L31.730469 24C31.730469 24 34.009719 17.157562 33.511719 13.476562C32.847594 8.5634375 28.936158 8.2091465 27.96875 8.1972656 z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Comment = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} {...props}>
      <path
        d="M32 6C17.641 6 6 17.641 6 32C6 37.37047 7.6299291 42.360708 10.419922 46.503906L8 58L20.568359 55.353516C24.019059 57.04597 27.897429 58 32 58C46.359 58 58 46.359 58 32C58 17.641 46.359 6 32 6 z M 20 21L44 21L44 25L20 25L20 21 z M 20 30L44 30L44 34L20 34L20 30 z M 20 39L34 39L34 43L20 43L20 39 z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Trash = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        d="M10 2L9 3L4 3L4 5L20 5L20 3L15 3L14 2L10 2 z M 5 7L5 20C5 21.1 5.9 22 7 22L17 22C18.1 22 19 21.1 19 20L19 7L5 7 z M 8 9L10 9L10 20L8 20L8 9 z M 14 9L16 9L16 20L14 20L14 9 z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Refresh = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        d="M9 3C8.448 3 8 3.448 8 4C8 4.552 8.448 5 9 5L18 5C18.552 5 19 5.448 19 6L19 15L17 15C16.596 15 16.231172 15.243188 16.076172 15.617188C16.025172 15.741187 16 15.871 16 16C16 16.26 16.101969 16.516031 16.292969 16.707031L19.292969 19.707031C19.683969 20.098031 20.317031 20.098031 20.707031 19.707031L23.707031 16.707031C23.993031 16.421031 24.077828 15.992188 23.923828 15.617188C23.768828 15.243187 23.404 15 23 15L21 15L21 6C21 4.343 19.657 3 18 3L9 3 z M 4 4C3.744125 4 3.4879687 4.0974687 3.2929688 4.2929688L0.29296875 7.2929688C0.00696875 7.5789687 -0.077828125 8.0078125 0.076171875 8.3828125C0.23117187 8.7568125 0.596 9 1 9L3 9L3 18C3 19.657 4.343 21 6 21L15 21C15.552 21 16 20.552 16 20C16 19.448 15.552 19 15 19L6 19C5.448 19 5 18.552 5 18L5 9L7 9C7.404 9 7.7688281 8.7568125 7.9238281 8.3828125C7.9748281 8.2588125 8 8.129 8 8C8 7.74 7.8980312 7.4839687 7.7070312 7.2929688L4.7070312 4.2929688C4.5115312 4.0974687 4.255875 4 4 4 z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let VerticalMenu = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} {...props}>
      <path
        d="M24 34A4 4 0 1024 42 4 4 0 1024 34zM24 20A4 4 0 1024 28 4 4 0 1024 20zM24 6A4 4 0 1024 14 4 4 0 1024 6z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};

export let Notification = ({ size = 20, color = "black", inher, ...props }) => {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} {...props}>
      <path
        d="M38.498 36H9.502c-1.205 0-2.31-.607-2.955-1.625S5.822 32.1 6.335 31.01L9 25.648v-6.267c0-8.239 6.271-14.987 14.277-15.364l0 0c4.151-.188 8.08 1.271 11.075 4.128C37.35 11.004 39 14.859 39 19v6.648l2.65 5.333c.527 1.119.448 2.377-.197 3.395S39.703 36 38.498 36zM23.348 5.516h.01H23.348zM18.09 38c.478 2.833 2.942 5 5.91 5s5.431-2.167 5.91-5H18.09z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};
